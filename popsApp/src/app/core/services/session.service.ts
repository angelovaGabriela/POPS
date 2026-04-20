import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Session, SessionData,
  SessionType,
  SessionGoal,
  Subcategory,
  YogaSubcategory,
  PilatesSubcategory,
  YOGA_SUBCATEGORIES,
  PILATES_SUBCATEGORIES,
  EXERCISE_OPTIONS
} from '../../shared/interfaces/session';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessionsKey = 'yoga_pilates_sessions';

  private _sessions$ = new BehaviorSubject<Session[]>([]);
  sessions$ = this._sessions$.asObservable();

  constructor(private api: ApiService) {}

  loadSessions(): Observable<Session[]> {
    return this.api.getSessions().pipe(
      tap((sessions) => {
        this._sessions$.next(sessions);
        this.persistToStorage(sessions);
      })
    );
  }

  saveSession(session: SessionData): Observable<Session> {
    return this.api.createSession(session).pipe(
      tap((created) => {
        const updated = [...this._sessions$.getValue(), created];
        this._sessions$.next(updated);
        this.persistToStorage(updated);
      })
    );
  }

  updateSession(id: string, partial: Partial<Session>): Observable<Session> {
    return this.api.updateSession(id, partial).pipe(
      tap((updatedSession) => {
        const sessions = this._sessions$.getValue().map(s =>
          s.id === id ? updatedSession : s
        );
        this._sessions$.next(sessions);
        this.persistToStorage(sessions);
      })
    );
  }

  deleteSession(id: string): Observable<void> {
    return this.api.deleteSession(id).pipe(
      tap(() => {
        const updated = this._sessions$.getValue().filter(s => s.id !== id);
        this._sessions$.next(updated);
        this.persistToStorage(updated);
      })
    );
  }

  getSessionById(id: string): Session | undefined {
    return this._sessions$.getValue().find(s => s.id === id);
  }


  getSubcategories(
    type: SessionType,
    goal: SessionGoal
  ): { value: Subcategory; label: string }[] {
    if (type === 'yoga') {
      return YOGA_SUBCATEGORIES[goal] as {
        value: YogaSubcategory;
        label: string;
      }[];
    }
    return PILATES_SUBCATEGORIES[goal] as {
      value: PilatesSubcategory;
      label: string;
    }[];
  }

  getExerciseOptions(subcategory: Subcategory): string[] {
    return EXERCISE_OPTIONS[subcategory] ?? [];
  }

  getExerciseCount(durationMinutes: number): number {
    if (!durationMinutes || durationMinutes <= 0) return 0;
    const reserved = durationMinutes > 5 ? 4 : 0;
    return Math.max(1, durationMinutes - reserved);
  }

  validateMusicUrl(url: string): boolean {
    if (!url) return true;
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace('www.', '');
      return (
        host === 'spotify.com' ||
        host === 'open.spotify.com' ||
        host === 'youtube.com' ||
        host === 'youtu.be'
      );
    } catch {
      return false;
    }
  }

  validateSession(session: Partial<Session>): string[] {
    const errors: string[] = [];

    if (!session.name?.trim()) errors.push('Session name is required.');
    if (!session.type) errors.push('Session type is required.');
    if (!session.goal) errors.push('Goal is required.');
    if (!session.subcategory) errors.push('Subcategory is required.');

    if (!session.durationMinutes || session.durationMinutes < 1) {
      errors.push('Duration must be at least 1 minute.');
    }

    if (session.musicUrl && !this.validateMusicUrl(session.musicUrl)) {
      errors.push('Music URL must be from Spotify or YouTube.');
    }

    const filled = (session.exercises ?? []).filter(e => e.name?.trim());
    if (filled.length === 0) {
      errors.push('Add at least one exercise.');
    }

    return errors;
  }

  

  // private loadFromStorage(): Session[] {
  //   try {
  //     const raw = localStorage.getItem(this.sessionsKey);
  //     return raw ? JSON.parse(raw) : [];
  //   } catch {
  //     return [];
  //   }
  // }

  private persistToStorage(sessions: Session[]): void {
    try {
      localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Could not persist sessions', e);
    }
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session, SessionData } from '../../shared/interfaces/session';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

 private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';


  getSessionById(sessionId: string): Observable<Session> {
  return this.http.get<Session>(`${this.apiUrl}/sessions/${sessionId}`, {
    withCredentials: true,
  });
}
createSession(data: SessionData): Observable<Session> {
  return this.http.post<Session>(`${this.apiUrl}/sessions`, data, {
    withCredentials: true,
  });
}


getSessions(): Observable<Session[]> {
  return this.http.get<Session[]>(`${this.apiUrl}/sessions`, {
    withCredentials: true,
  });
}

updateSession(id: string, data: Partial<Session>): Observable<Session> {
  return this.http.put<Session>(`${this.apiUrl}/sessions/${id}`, data, {
    withCredentials: true,
  });
}

deleteSession(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/sessions/${id}`, {
    withCredentials: true,
  });
}

  }

  


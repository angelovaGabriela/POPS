import { Component, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { Session } from '../../interfaces/session';

@Component({
  selector: 'app-session-item',
  imports: [RouterLink],
  templateUrl: './session-item.component.html',
  styleUrl: './session-item.component.css',
})
export class SessionItemComponent {
  @Input() session!: Session;  

}

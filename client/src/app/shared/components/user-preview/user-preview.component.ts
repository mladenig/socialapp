import {Component, Input, OnInit} from '@angular/core';
import {ShowUserDTO} from '../../../users/models/show-user.dto';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})

export class UserPreviewComponent {
  @Input() users: ShowUserDTO[];
}

import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private ngbModal: NgbModal
  ) {
  }

  open(modal: any): void {
    this.ngbModal.open(modal);
  }
}

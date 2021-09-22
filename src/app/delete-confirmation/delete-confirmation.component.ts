import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }

  confirmDeletion() {
    this.dialogRef.close(true);
  }

  cancelDeletion() {
    this.dialogRef.close(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modals/modal-user/modal-user.component';
import { SnackbarService } from '../../Services/snackbar.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  length = 0;
  pageSize = 1;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;



  users: User[] = [];
  searchValue: string = '';

  constructor(private userService: UserService, public dialog: MatDialog, private snkbr: SnackbarService) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getAllUser().subscribe(users => {
      this.length = users.length - 1;
      this.pageSizeOptions = this.pageSizeOptions.filter((number) => number <= this.length);
      this.fetchUserPaginator();
    });
  }

  fetchUserPaginator() {
    this.userService.getAllUserPaginator({
      "pageNumber": this.pageIndex + 1,
      "itemsPerPage": this.pageSize,
    }).subscribe(users => {
      this.users = users.data;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '50vw', // Chỉnh kích thước theo chiều ngang

      data: { action: "Add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdateDialog(idUser: string): void {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '50vw', // Chỉnh kích thước theo chiều ngang

      data: { action: "Update", id: idUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteUser(id: string) {

    this.userService.deleteUser(id).subscribe(data => {

      this.ngOnInit();
      this.snkbr.openSnackBar("User Delete Succesfully", 'success');

    })

  }

  onSearchChange() {
    if (!this.searchValue.trim) {
      this.fetchUser();
    }
    else {
      this.userService.getAllUserPaginator({
        "pageNumber": this.pageIndex + 1,
        "itemsPerPage": this.pageSize,
      }).subscribe(users => {
        this.users = users.data.filter((user: User) => user.userName.includes(this.searchValue));
      });
    }
  }


  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchUserPaginator();
  }


}
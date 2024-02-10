import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  // SET local storage
  setLocalStorage(_res: any)
  {
    localStorage.setItem('accessToken', _res.accessToken);
    localStorage.setItem('refreshToken', _res.refreshToken);
    localStorage.setItem('user', JSON.stringify(_res.user));

  }
  setNewUserInfo(_fullName: string, _email: string)
  {
    console.log(_fullName, _email);
    const userString = localStorage.getItem('user')??'null';
    const user = JSON.parse(userString);

    user.fullName = _fullName; // Thay đổi thành giá trị mới
    user.email = _email; // Thay đổi thành giá trị mới
   
    localStorage.setItem('user', JSON.stringify(user));

  }
 // CLEAR local storage
  clearLocalStorage()
  {
    localStorage.clear();
  }
  getUserRole()
  {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);

      // Kiểm tra xem user.roles có tồn tại và có giá trị không rỗng
      if (userObject.roles && userObject.roles.length > 0) {
        const userRoles = userObject.roles;
        return userRoles;
      } else {
        return 'null'
      }
    } else {
      return 'null'
    }
  }
  getAccessToken()
  {
    return localStorage.getItem("AccessToken") ?? 'null'
  }
  getUserName()
  {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);

      // Kiểm tra xem user.roles có tồn tại và có giá trị không rỗng
      if (userObject.userName && userObject.userName.length > 0) {
        const userName = userObject.userName;
        return userName;
      } else {
        return 'null'
      }
    } else {
      return 'null'  }
  }
  getUserFullName()
  {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);

      // Kiểm tra xem user.roles có tồn tại và có giá trị không rỗng
      if (userObject.fullName && userObject.fullName.length > 0) {
        const fullName = userObject.fullName;
        return fullName;
      } else {
        return 'null'
      }
    } else {
      return 'null'  }
  }
  getUserEmail()
  {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);

      // Kiểm tra xem user.roles có tồn tại và có giá trị không rỗng
      if (userObject.email && userObject.email.length > 0) {
        const email = userObject.email;
        return email;
      } else {
        return 'null'
      }
    } else {
      return 'null'  }
  }
}

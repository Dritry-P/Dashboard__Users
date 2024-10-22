import { makeAutoObservable } from 'mobx';
import { getDepartments, getUsers } from '../http/Reqest';

class UsersStore {
  isAuth = false;
  users = [];
  filteredUsers = [];
  departments = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }
  
  setUsers(users) {
    this.users = users['hydra:member'];
    this.filteredUsers = this.users;
  }

  fetchUsers = async () => {
    try {
      const users = await getUsers();
      this.setUsers(users);
      console.log(this.users);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  }

  setDepartments(departments) {
    this.departments = departments['hydra:member'];
  }

  fetchDepartments = async () => {
    try {
      const departments = await getDepartments();
      this.setDepartments(departments);
      console.log(this.departments);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  }

  filterUsers(filters) {
    this.filteredUsers = this.users.filter(user => {
      return (
        (!filters.name || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.lastName || user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
        (!filters.position || user.position.toLowerCase().includes(filters.position.toLowerCase())) &&
        (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase()))
      );
    });
  }
}

const usersStore = new UsersStore();
export default usersStore;

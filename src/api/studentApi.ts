import { Student } from './../models/student';
import { City } from 'models';
import { ListResponse, ListParams } from './../models/common';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    // trả về object gồm data + pagination
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Student> {
    // trả về cái object Student
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  add(params: Student): Promise<Student> {
    // trả về cái object Student
    const url = '/students';
    return axiosClient.post(url, params);
  },
  update(params: Student, id: string): Promise<Student> {
    // trả về cái object Student
    const url = `/students/${id}`;
    return axiosClient.patch(url, params);
  },
  remove(id: string): Promise<any> {
    // trả về cái gì cũng được không quan trọng
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};
export default studentApi;

import request from '@/utils/request'

export function register(data) {
  return request({
    url: 'http://127.0.0.1:8003/api/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: 'http://127.0.0.1:8003/api/login' + '?verifyCode=' + data.verify,
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'http://127.0.0.1:8003/api/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function saveUser(data) {
  return request({
    url: 'http://127.0.0.1:8003/api/user/user',
    method: 'post',
    data
  })
}

export function listUser() {
  return request({
    url: 'http://127.0.0.1:8003/api/user/users',
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: 'http://localhost:8003/api/user/user',
    method: 'patch',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: 'http://localhost:8003/api/user/user?id='+data,
    method: 'delete',
    data
  })
}

export function fetchUserRole(data) {
  return request({
    url: 'http://localhost:8003/api/user/rids/'+data,
    method: 'get',
    data
  })
}

export function listRole() {
  return request({
    url: 'http://localhost:8003/api/user/roles',
    method: 'get'
  })
}

export function deleteUserRole(data) {
  return request({
    url: 'http://localhost:8003/api/user/user/role?uid='+data.uid+'&rid='+data.rid,
    method: 'delete',
    data
  })
}

export function setRole(data) {
  return request({
    url: 'http://localhost:8003/api/user/user/role',
    method: 'post',
    data
  })
}

export function test(data) {
  return request({
    url: '/verifyCode?timestamp='+data,
    method: 'get',
    data
  })
}

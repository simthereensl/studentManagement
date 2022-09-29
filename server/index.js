import { query } from "./db";
import requests from "./requests";
export function login(query){
    return requests({
        url: '/login',
        method: 'get', 
        params: query
    })
} 
export function loginStu(query){
    return requests({
        url: '/loginStu',
        method: 'get', 
        params: query
    })
} 
export function addStudent(query){
    return requests({
        url: '/addStudent',
        method: 'post',
        params: query
    })
}
 
export function showStudent(){
    return requests({
        url: '/showStudent'
    })
} 

export function deleteStudent(query){
    return requests({
        url: '/deleteStudent',
        method: 'post',
        params: query
    })
}

export function editStudent(query){
    return requests({
        url: '/editStudent',
        method: 'post',
        params: query
    })
}

export function uploadFile(query){
    return requests({
        url: '/uploadFile',
        method: 'post',
        params: query
    })
}

export function relTest1(query){
    return requests({
        url: '/relTest1',
        method: 'post',
        params: query
    })
}

export function relTest2(query){
    return requests({
        url: '/relTest2',
        method: 'post',
        params: query
    })
}

export function testCheck(query){
    return requests({
        url: '/testCheck',
        method: 'get',
        params: query
    })
}

export function getTest(){
    return requests({
        url: '/getTest'
    })
}

export function getComplete(query){
    return requests({
        url: '/getComplete',
        method: 'get',
        params: query
    })
}

export function insertStuTest(query){
    return requests({
        url: '/insertStuTest',
        method: 'post',
        params: query
    })
}

export function showInfo1(){
    return requests({
        url: '/showInfo1'
    })
}

export function showInfo2(){
    return requests({
        url: '/showInfo2'
    })
}

export function finishInfo1(query){
    return requests({
        url: '/finishInfo1',
        method: 'post',
        params: query
    })
}
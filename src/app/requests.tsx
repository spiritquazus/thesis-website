"use client"
import React, { useState } from 'react';


export async function createUser(_obj: object){
    try {
        const response = await fetch('/api/userCreate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(_obj),})

        const res = await response.json();
        console.log('New user created!', res);

    } catch(error){
        console.log('New user creation failed: ', error)
    }
}

export async function userUpdate(_obj: object){
    try {
        const response = await fetch('/api/userUpdate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(_obj),})

        const res = await response.json();
        console.log('User completed view!', res);

    } catch(error){
        console.log('User update failed: ', error)
    }
}

export async function userSurvey(_obj: object){
    try {
        const response = await fetch('/api/userSurvey', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(_obj),})

        const res = await response.json();
        console.log('User completed the survey.', res);

    } catch(error){
        console.log('User survey update fail! ', error)
    }
}

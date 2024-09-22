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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'User creation failed');
            }

            const res = await response.json();
            console.log('New user created!', res);
            return res;
    } catch(error){
        console.log('New user creation failed: ', error)
        return error
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
        return { ok: response.ok }
    } catch(error){
        console.log('User update failed: ', error)
        return { ok: false, msg: error }
    }
}

export async function userSurvey(_obj: object): Promise<{ ok: boolean, msg: any | null }> {
    try {
        const response = await fetch('/api/userSurvey', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(_obj),
        });
        const res = await response.json()
        console.log('User completed the survey.', res)
        return { ok: response.ok, msg: null }
    } catch (error) {
        console.log('User survey update failed! ', error)
        return { ok: false, msg: error }
    }
}

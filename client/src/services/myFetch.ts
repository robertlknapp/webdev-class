export const API_ROOT = 'http://localhost:3000/api/v1/';
//export const API_ROOT = 'https://dummyjson.com/';

export default function myFetch<T>(url: string): Promise<T> {
    return fetch(API_ROOT + url).then( x => x.json() ); //return json version of x, remember this is a promise
    //same code written more familiar way: return fetch(API_ROOT + url).then( function(x){ return x.json(); } );
}
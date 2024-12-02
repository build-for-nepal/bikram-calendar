#!/bin/bash

read -p "Enter the year for event file: " year

filename="events-$year.js"
touch "$filename"

echo "/* Example data
# { 
#         event: test bikram event, 
#         dateType: bikram, 
#         date: 2081/08/19, 
#         detail: this is event detail. this event has fixed date, 
#         category: Cultural 
#     } */

var bikramFixedEvents = [
    { 
        event: 
        dateType: 
        date: 
        detail: 
        category:  
    },
    { 
        event: 
        dateType: 
        date: 
        detail: 
        category:  
    },
// test data
    { 
        event: 
        dateType: 
        date: 
        detail: 
        category:  
    }
];
" > $filename

echo "File '$filename' created successfully."

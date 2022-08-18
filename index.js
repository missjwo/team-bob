// this is wrapped in an `async` function
// you can use await throughout the function

// Lets split the strings so we can review each line separately.
const team_members = inputData.team_members.split( "," );
let birthdays = [];
let peoples_status = [];
let work_anniversaries = [];

// check if there is data before working with inputData. 
if ( inputData.birthdays ){
  birthdays = inputData.birthdays.split( "\n" );
} 
if ( inputData.peoples_status ){
  peoples_status = inputData.peoples_status.split( "\n" );
}
if ( inputData.work_anniversaries ){
  work_anniversaries= inputData.work_anniversaries.split( "\n" );
}

// if there is no data at all, can return output early. 
if ( ! birthdays.length && ! peoples_status.length && ! work_anniversaries.length ){
 return [{}];
}

const found_birthdays = [];
const found_status = [];
const found_anniversaries = [];

// Loop through each team member
team_members.forEach( ( member ) => {

  if ( birthdays.length ) {
    //- find if their name is any of the birthday array.
    //-- If it is, add to found birthdays. 
    birthdays.forEach( ( birthdate ) => {
      if( birthdate.toLowerCase().includes( member.trim().toLowerCase() ) ){
         found_birthdays.push( birthdate );
      }
    });
  }

  if ( peoples_status ) {
    //- find if their name is any of the peoples status array.
    //-- If it is, add to found statuses
    peoples_status.forEach( ( status ) => {
      if( status.toLowerCase().includes( member.trim().toLowerCase() ) ){
         found_status.push( status );
      }
    });
  }
  
  if ( work_anniversaries ) {
    //- find if their name is contained in any of the work anniversaries array.
    //-- if it is add to found anniversaries.
    work_anniversaries.forEach( ( anniversary ) => {
      if( anniversary.toLowerCase().includes( member.trim().toLowerCase() ) ){
         found_anniversaries.push( anniversary );
      }
    });
  }

});

/* 
  Format finds and turn into Slack messages. 
  - if either message is empty,  output a empty array. 
  - if a message has content, add header, format and styling. 
  - output final Slack message.
*/

let return_msg ="";

// Check, sort and build Peoples Status message.
if ( Array.isArray( found_status ) && found_status.length) {
  found_status.sort();
  return_msg += "*People\'s Status*\n";
  return_msg += found_status.join( "\n" );
  return_msg += "\n";
}

// Check, sort and build Work Anniversaries message.
if ( Array.isArray( found_anniversaries ) && found_anniversaries.length ) {
  found_anniversaries.sort();
  return_msg += "*Work Anniversaries*\n";
  return_msg += found_anniversaries.join( "\n" );
  return_msg += "\n";
}

// Check, sort and build birthday message.
if ( Array.isArray( found_birthdays ) && found_birthdays.length ) {
  found_birthdays.sort();
  return_msg += "*Birthdays*\n";
  return_msg += found_birthdays.join( "\n" );
  return_msg += "\n";
}

// Return what you want.
if ( return_msg.trim().length ) {
  
  return_msg = "[Bob Daily Digest](" + inputData.permalink +")\n" + return_msg;
  output = [{ return_msg }];
} else {
  output = [{}];
}

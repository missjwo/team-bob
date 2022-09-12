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

let found_birthdays = [];
let found_status = [];
let found_anniversaries = [];

//Find Member in a list Function 
function findMember( list, person ) {

  for (let i = 0; i < list.length ; i++) {
    if( list[i].toLowerCase().includes( person.trim().toLowerCase() ) ){
      return list[i];
    }
  }
}

// Loop through each team member
team_members.forEach( ( member ) => {

  if ( birthdays.length ) {
    found_birthdays.push( findMember( birthdays, member ) );
  }
  
  if ( peoples_status.length ) {
    found_status.push( findMember( peoples_status, member ) );
  }
  
  if ( work_anniversaries.length ) {
    found_anniversaries.push( findMember( work_anniversaries, member ) );
  }

} );

/* 
  Format finds and turn into Slack messages. 
  - Check if there are found messages. 
  - If a message has content, add heading with Slack MarkDown formatting and styling before adding the found messages. 
  - Add to final Slack message.
*/

let return_msg ="";

// Check, sort and build Peoples Status message.
if ( Array.isArray( found_status ) && found_status.length ) {

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

// Return what you want
if( return_msg.trim().length ) {

  return_msg = "<" + inputData.permalink +"|Bob Daily Digest>\n" + return_msg;
  output = [{ return_msg }];
} else {
  output = [{}];
}

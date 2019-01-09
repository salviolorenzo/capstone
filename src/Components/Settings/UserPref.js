import React from 'react';
// -- Adjust background pictures
// -- Add preffered news sources
function UserPref(props) {
  return (
    <div className='settingsDiv'>
      <form
        className='settingsForm userPref'
        onSubmit={event => {
          props.handleNewBackground(event);
        }}
      >
        <input
          type='text'
          placeholder='Landscape, Mountains, City'
          name='bgTerm'
        />
        <input type='submit' value='Add' />
      </form>
      <form
        className='settingsForm userPref'
        onSubmit={event => {
          props.handleNewsSource(event);
        }}
      >
        <input type='text' placeholder='BBC, CNN, Fox' name='newsTerm' />
        <input type='submit' value='Add' />
      </form>
      {/* <ul>
        {props.preferences.news.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul> */}
      {/* <ul>
        {props.preferences.backgrounds.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul> */}
    </div>
  );
}

export default UserPref;

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
          value={props.bgTerm}
          onChange={event => {
            props.handleBgTermChange(event);
          }}
        />
        <input type='submit' value='Add' />
      </form>
      <form
        className='settingsForm userPref'
        onSubmit={event => {
          props.handleNewsSource(event);
        }}
      >
        <select
          onChange={event => {
            props.handleNewsTermChange(event);
          }}
        >
          <option value='abc-news'>ABC News</option>
          <option value='ars-technica'>Ars Technica</option>
          <option value='associated-press'>Associated Press</option>
          <option value='axios'>Axios</option>
          <option value='bbc-news'>BBC News</option>
          <option value='bbc-sport'>BBC Sport</option>
          <option value='bleacher-report'>Bleacher Report</option>
          <option value='bloomberg'>Bloomberg</option>
          <option value='breitbart-news'>Breitbart News</option>
          <option value='business-insider'>Business Insider</option>
          <option value='buzzfeed'>Buzzfeed</option>
          <option value='cbc-news'>CBC News</option>
          <option value='cbs-news'>CBS News</option>
          <option value='cnbc'>CNBC</option>
          <option value='cnn'>CNN</option>
          <option value='crypto-coins-news'>Crypto Coins News</option>
          <option value='daily-mail'>Daily Mail</option>
          <option value='engadget'>Engadget</option>
          <option value='entertainment-weekly'>Entertainment Weekly</option>
          <option value='espn'>ESPN</option>
          <option value='financial-post'>Financial Post</option>
          <option value='financial-times'>Financial Times</option>
          <option value='fortune'>Fortune</option>
          <option value='four-four-two'>FourFourTwo</option>
          <option value='fox-news'>Fox News</option>
          <option value='google-news'>Google News</option>
          <option value='hacker-news'>Hacker News</option>
          <option value='ign'>IGN</option>
          <option value='independent'>Independent</option>
          <option value='mashable'>Mashable</option>
          <option value='medical-news-today'>Medical News Today</option>
          <option value='metro'>Metro</option>
          <option value='mirror'>Mirror</option>
          <option value='msnbc'>MSNBC</option>
          <option value='mtv-news'>MTV News</option>
          <option value='national-geographic'>National Geographic</option>
          <option value='national-review'>National Review</option>
          <option value='nbc-news'>NBC News</option>
          <option value='news24'>News24</option>
          <option value='new-scientist'>New Scientist</option>
          <option value='newsweek'>Newsweek</option>
          <option value='next-big-future'>Next Big Future</option>
          <option value='nfl-news'>NFL News</option>
          <option value='nhl-news'>NHL News</option>
          <option value='polygon'>Polygon</option>
          <option value='reuters'>Reuters</option>
          <option value='techcrunch'>Tech Crunch</option>
          <option value='techradar'>Tech Radar</option>
          <option value='the-american-conservative'>
            The American Conservative
          </option>
          <option value='the-economist'>The Economist</option>
          <option value='the-hill'>The Hill</option>
          <option value='the-huffington-post'>The Huffington Post</option>
          <option value='the-lad-bible'>The Lad Bible</option>
          <option value='the-new-york-times'>The New York Times</option>
          <option value='the-next-web'>The Next Web</option>
          <option value='the-telegraph'>The Telegraph</option>
          <option value='the-verge'>The Verge</option>
          <option value='the-wall-street-journal'>
            The Wall Street Journal
          </option>
          <option value='the-washington-post'>The Washington Post</option>
          <option value='the-washington-times'>The Washington Times</option>
          <option value='time'>Time</option>
          <option value='usa-today'>USA Today</option>
          <option value='vice-news'>Vice News</option>
          <option value='wired'>Wired</option>
          <option value='wired'>Wired</option>
        </select>

        <input type='submit' value='Add' />
      </form>
      <ul className='preferenceList'>
        {props.preferences
          .filter(object => {
            return object.type === 'background';
          })
          .map((item, index) => {
            return <li key={index}>{item.term}</li>;
          })}
      </ul>
      <ul className='preferenceList'>
        {props.preferences
          .filter(object => {
            return object.type === 'news_source';
          })
          .map((item, index) => {
            return <li key={index}>{item.term}</li>;
          })}
      </ul>
    </div>
  );
}

export default UserPref;

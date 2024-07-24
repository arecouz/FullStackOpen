import axios from 'axios';
import { useState } from 'react';
import { NewEntry } from '../types';
import { postEntry } from '../services/entries';

const NewDiaryEntry = () => {
  const [notification, setNotification] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const doNotification = (msg: string) => {
    const notificationLength = 3000;
    setNotification(msg);
    setTimeout(() => setNotification(''), notificationLength);
  };

  const createEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = { date, visibility, weather, comment };

    try {
      const addedEntry = await postEntry(newEntry);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      doNotification(`${addedEntry.date} entry added successfully!`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        doNotification(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Diary Entry</h1>
      <form onSubmit={createEntry}>
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-control"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="form-group">
          <hr></hr>
          <label className="form-label">Visibility:</label>
          <div className="mt-2">
            {' '}
            {/* Add margin-top here */}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="poor"
                name="visibility"
                value="poor"
                checked={visibility === 'poor'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label className="form-check-label" htmlFor="visibility1">
                poor
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="okay"
                name="visibility"
                value="okay"
                checked={visibility === 'okay'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label className="form-check-label" htmlFor="visibility2">
                okay
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="good"
                name="visibility"
                value="good"
                checked={visibility === 'good'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label className="form-check-label" htmlFor="visibility3">
                good
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="great"
                name="visibility"
                value="great"
                checked={visibility === 'great'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label className="form-check-label" htmlFor="visibility4">
                great
              </label>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="form-group">
          <label className="form-label">Weather</label>
          <div className="mt-2">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="weather1"
                name="weather"
                value="sunny"
                checked={weather === 'sunny'}
                onChange={(event) => setWeather(event.target.value)}
              />
              <label className="form-check-label" htmlFor="weather1">
                sunny
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="cloudy"
                name="weather"
                value="cloudy"
                checked={weather === 'cloudy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              <label className="form-check-label" htmlFor="weather2">
                cloudy
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="weather3"
                name="weather"
                value="rainy"
                checked={weather === 'rainy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              <label className="form-check-label" htmlFor="weather3">
                rainy
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="weather3"
                name="weather"
                value="stormy"
                checked={weather === 'stormy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              <label className="form-check-label" htmlFor="weather3">
                stormy
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="weather4"
                name="weather"
                value="windy"
                checked={weather === 'windy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              <label className="form-check-label" htmlFor="weather4">
                windy
              </label>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="form-group">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea
            id="comment"
            className="form-control"
            rows={4}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>{notification}</p>
    </div>
  );
};

export default NewDiaryEntry;

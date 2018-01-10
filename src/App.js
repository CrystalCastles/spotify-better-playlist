import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Daniel',
    playlists: [
      {
        name: 'Cool songs',
        songs: [
          {name:'Ayy lmao', duration: 1443}, 
          {name: 'cmonBruh', duration: 1235},
          {name: 'Feel Good Inc', duration: 1533}
        ]
        
      },
      {
        name: 'New Releases',
        songs: [
          {name:'Ayy lmao', duration: 1443}, 
          {name: 'cmonBruh', duration: 1235},
          {name: 'De Wey', duration: 1533}
        ]
      },
      {
        name: 'New Portillo',
        songs: [
          {name:'Ayy lmao', duration: 1443}, 
          {name: 'cmonBruh', duration: 1235},
          {name: 'Feel Good Inc', duration: 1533}
        ]
      },
      {
        name: 'Safe Releases',
        songs: [
          {name:'Ayy lmao', duration: 1443}, 
          {name: 'Chu Mean', duration: 1235},
          {name: 'Feel Good Inc', duration: 1533}
        ]
      },
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.floor(totalDuration/60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ? 
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
        
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
        
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }
          }/>
          
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map(playlist =>
            <Playlist playlist={playlist}/>
          )}
          
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;

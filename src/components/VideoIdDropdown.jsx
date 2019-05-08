/**
 * A Container Component that renders a dropdown based on
 * the videos in the store.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchVideoList,
  updateSelectedVideo,
  getAnalyticsForVideo
} from '../actions';
import './VideoIdDropdown.css';

class VideoIdDropdown extends Component {
  constructor (props, context) {
    super(props, context);

    this.getVideoList = this.getVideoList.bind(this);
    this.handleVideoChange = this.handleVideoChange.bind(this);
  }

  componentDidMount () {
    this.getVideoList();
  }

  renderOptions () {
    const { videoIds } = this.props;

    return videoIds.map((videoId, i) => (
      <option value={videoId} key={`videoId-${i}`}>
        {videoId}
      </option>
    ));
  }

  getVideoList () {
    const { dispatch } = this.props;

    dispatch(fetchVideoList());
  }

  handleVideoChange = event => {
    const { dispatch } = this.props;

    dispatch(updateSelectedVideo(event.target.value));
    dispatch(getAnalyticsForVideo(event.target.value));
  };

  render () {
    return (
      <div>
        <p>VideoIdDropdown</p>
        <select onChange={this.handleVideoChange}>
          <option>SELECT VIDEO</option>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

/**
 * see https://redux-docs.netlify.com/basics/usage-with-react#implementing-container-components
 */
const mapStateToProps = (state) => ({
  videoIds: state.base.videos.map(e => e.id),
  selectedVideo: state.base.selectedVideo
});

export default connect(mapStateToProps)(VideoIdDropdown);
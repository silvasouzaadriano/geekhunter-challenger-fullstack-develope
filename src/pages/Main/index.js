import React, { Component } from 'react';
import { FaVideo, FaSpinner, FaSearch} from 'react-icons/fa';


import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    loadMovie: '',
    movies: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ loadMovie: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let data = []

    const { loadMovie } = this.state;

    this.setState({
      movies: []
    });

    if (loadMovie) {

      const response = await api.get(`/?s=${loadMovie}&apikey=12a14590`);

      data = response.data.Search;

    } else {
      data = null;
    }



    this.setState({
      movies: data,
      loadMovie: '',
      loading: false,
    });


  };

  render() {
    const { loadMovie, movies, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaVideo />
          Movies on OMDb API
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search movies"
            value={loadMovie}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaSearch color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        { movies ? (
          <List>
            {movies.map(repository => (
              <li key={repository.imdbID}>
                <span>{repository.Title}</span>
              </li>
            ))}
          </List>
        ) : (
          <List />
        )}

      </Container>
    );
  }
}

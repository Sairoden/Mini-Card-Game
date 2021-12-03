import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    const data = await response.data;
    this.setState({ deck: data });
  }

  async getCard() {
    try {
      // make request using deck id
      let id = this.state.deck.deck_id;
      let cardUrl = `${API_BASE_URL}/${id}/draw`;
      let cardRes = await axios.get(cardUrl);
      let cardData = await cardRes.data;
      if (!cardData.success) throw new Error("No card remaining!");
      console.log(cardData);

      let card = cardData.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));

      // set state using new card info from new api
    } catch (err) {
      alert(`Can't draw more card!`, err.message);
    }
  }

  render() {
    const cards = this.state.drawn.map(card => (
      <Card name={card.name} image={card.image} key={card.image} />
    ));

    return (
      <div className="Deck">
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
        {cards}
      </div>
    );
  }
}

export default Deck;

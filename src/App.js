import React, { Component } from "react";
import "./styles/App.css";
import Newslist from "./components/Newslist";
import Input from "./components/Input";
import Categories from "./components/Categories";
import Model from "./components/Model";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelId: 0,
      modelActive: false,
      showModel: async (e) => {
        let id = -1;
        if (e.target.className !== "news") {
          id = e.target.parentElement.id;
        } else {
          id = e.target.id;
        }
        await this.setState({ modelId: id });
        await this.setState({ modelActive: true });
      },
      hideModel: async () => {
        await this.setState({ modelActive: false });
        await this.setState({ modelId: -1 });
      },
      urlId: 0,
      URLs: [
        {
          id: 0,
          name: "Business in US",
          link: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e9504aa0b612423489fa8aec1e577871`,
        },
        {
          id: 1,
          name: "TechCrunch",
          link: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e9504aa0b612423489fa8aec1e577871`,
        },
        {
          id: 2,
          name: "Wall Street Journal",
          link: `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=e9504aa0b612423489fa8aec1e577871`,
        },
      ],
      News: [],
      displayedNews: [],
      searchTitle: "",
      changeURL: async (event) => {
        if (this.state.urlId !== event.target.value) {
          await this.setState({
            urlId: event.target.value,
          });
          this.state.popNews();
          this.state.showCategories();
        }
      },
      showCategories: () => {
        document.querySelector(".App-categories").classList.toggle("show");
      },
      clearNews: () => {
        this.setState({
          displayedNews: [],
        });
      },
      searchNews: async () => {
        // clear the array of displayed news
        await this.state.clearNews();

        // IF -> to cheack of the user typed anything
        // ELSE IF -> to cheack if the user typed anything and seeing if the array contains the typed value
        this.state.News.forEach((news) => {
          if (!this.state.searchTitle) {
            this.setState({
              displayedNews: [...this.state.News],
            });
          } else if (
            this.state.searchTitle &&
            news.title
              .toLowerCase()
              .includes(this.state.searchTitle.toLowerCase())
          ) {
            this.setState({
              displayedNews: [...this.state.displayedNews, news],
            });
          }
        });
      },
      popNews: async () => {
        this.setState({
          displayedNews: [],
        });
        this.setState({
          News: [],
        });

        await fetch(`${this.state.URLs[this.state.urlId].link}`)
          .then((response) => response.json())
          .then((data) => {
            data.articles.forEach((article) => {
              this.setState({ News: [...this.state.News, article] });
              this.setState({
                displayedNews: [...this.state.displayedNews, article],
              });
            });
          });
      },
    };
    this.onChange = this.onChange.bind(this);
    this.state.popNews();
  }
  onChange(event) {
    this.setState({
      searchTitle: event.target.value,
    });
    this.state.searchNews();
  }
  render() {
    return (
      <div className="App">
        <div className="App-categories">
          {this.state.URLs.map((url, i) => (
            <Categories url={url} changeURL={this.state.changeURL} key={i} />
          ))}
        </div>
        {this.state.modelActive === true && (
          <Model
            hide={this.state.hideModel}
            news={this.state.displayedNews[this.state.modelId]}
          />
        )}
        <div className="App-header">
          <div className="App-category">
            <button
              className="btn-categories"
              onClick={this.state.showCategories}
            >
              Change Category
            </button>
          </div>
          <div className="App-search">
            <Input value={this.state.searchTitle} onChange={this.onChange} />
          </div>
        </div>
        <div className="news-container">
          {this.state.displayedNews.map((news, i) => (
            <Newslist
              news={news}
              onClick={this.state.showModel}
              id={i}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

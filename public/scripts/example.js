const loadCommentsFromServer = (toUrl) => {
  $.ajax({
    url: toUrl,
    dataType: 'json',
    cache: false,

    success: function (data) {
      ReactDOM.render(
        <MoviesBox data={data} onSubmit={submitComment}/>,
        document.getElementById('content')
      );
    },

    error: function (xhr, status, err) {
      console.error(toUrl, status, err.toString());
    }
  });
};


const submitComment = (comment) => {
  var toUrl = "/api/comments"
  console.log(comment.author, comment.text);
  $.ajax({
    url: toUrl,
    dataType: 'json',
    type: 'POST',
    data: comment,
    success: function() {
      loadCommentsFromServer(toUrl);
    },
    error: function(xhr, status, err) {
      console.error(toUrl, status, err.toString());
    }.bind(this)
  });
}

const MoviesBox = (props) => {
  const textMarkup = toRawMarkup("*Movies* box");
  return (
    <div className="moviesBox">
      <h1>
        <span dangerouslySetInnerHTML={ { __html: textMarkup} }/>
      </h1>
      <MovieList {...props} />
      <CommentForm onSubmit={props.onSubmit}/>
    </div>
  )
};

const MovieList = (props) => {
  var movieNodes = props.data.map(function (movie) {
    return (
      // with this style access props.item.author in Comment component
      // <Comment item={movie} key={movie.id} />

      <Comment {...movie} key={movie.id}/>
    );
  });
  return (
    <div className="movieList">
      {movieNodes}
    </div>
  )
};

const toRawMarkup = (input) => {
  var rawMarkup = marked(input.toString(), {sanitize: true});
  return rawMarkup;
};

const Comment = (props) => {
  return (
    <div className="comment">
      <h2 className="commentAuthor">
        {props.author}
      </h2>
      {props.text}
    </div>
  )
}


const CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  submitComment: function(evt) {
    evt.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!author || ! text) {
      return;
    }
    this.props.onSubmit({author: author, text: text});
    this.setState({author: '', text: ''})
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.submitComment}>
        <input type="text" placeholder="Your Name" value={this.state.author} onChange={this.handleAuthorChange}/>
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        <input type="submit" value="Post" />
      </form>
    )
  }
})


var testdata = [
  {id: "1", author: "Alex", text: "Testing"},
  {id: "2", author: "Alex2", text: "Testing2"},
];

loadCommentsFromServer("/api/comments");

//ReactDOM.render(
//  <MoviesBox data={testdata}/>,
//  document.getElementById('content')
//);

var log = function (evt) {
  console.log(evt.target.value)
}

//ReactDOM.render(
//  <input defaultValue="Hello!" onChange={foo}/>,
//  document.getElementById('container')
//);

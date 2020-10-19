import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import BookTable from "./BookTable";
import AddBookModal from "./AddBookButton";
import Loading from "./Loading";
import ImageWithPlaceHolder from "./ImageWithPlaceHolder";

const AuthorDetail = ({ authors, books, loading, user }) => {
  const { authorID } = useParams();

  if (loading) return <Loading />;

  const author = authors.find((author) => author.id === +authorID);

  if (!author) return <Redirect to="/" />;

  const authorName = `${author.first_name} ${author.last_name}`;
  const authorBooks = books.filter((book) =>
    book.authors.map((author) => author.id).includes(author.id)
  );

  return (
    <div className="author">
      <div>
        <h3>{authorName}</h3>
        <ImageWithPlaceHolder
          src={author.imageUrl}
          className="img-thumbnail img-fluid"
          alt={authorName}
        />
      </div>
      <BookTable books={authorBooks} />
      {user && <AddBookModal authorID={author.id} />}
    </div>
  );
};

const mapStateToProps = ({ authors, books, user }) => {
  return {
    authors,
    books,
    loading: !authors.length || !books.length,
    user,
  };
};

export default connect(mapStateToProps)(AuthorDetail);

import React, { useState } from "react";
import { connect } from "react-redux";

// Components
import AddAuthorCard from "./AddAuthorCard";
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

const AuthorsList = ({ authors, loading, user }) => {
  const [query, setQuery] = useState("");

  const filterAuthors = () => {
    return authors.filter((author) => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  };

  if (loading) return <Loading />;

  const authorCards = filterAuthors().map((author) => (
    <AuthorCard
      key={author.id + author.first_name + author.last_name}
      author={author}
    />
  ));

  return (
    <div className="authors">
      <h3>Authors</h3>
      <SearchBar onChange={setQuery} />
      <div className="row">

        {user && <AddAuthorCard />}
        {authorCards}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authors, user }) => ({
  authors,
  loading: !authors.length,
  user,
});

export default connect(mapStateToProps)(AuthorsList);

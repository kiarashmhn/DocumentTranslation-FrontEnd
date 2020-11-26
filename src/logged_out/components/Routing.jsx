import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";

class Routing extends Component {
  render() {
    const { blogPosts, selectBlog, selectHome } = this.props;

    return (
      <Switch>
        {blogPosts.map(post => (
          <PropsRoute
            path={post.url}
            component={BlogPost}
            title={post.title}
            key={post.title}
            src={post.src}
            date={post.date}
            content={post.content}
            otherArticles={blogPosts.filter(
              blogPost => blogPost.id !== post.id
            )}
          />
        ))}
        <PropsRoute
          exact
          path="/blog"
          component={Blog}
          selectBlog={selectBlog}
          blogPosts={blogPosts}
        />
        <PropsRoute path="/" component={Home} selectHome={selectHome} />
      </Switch>
    );
  }
}

Routing.propTypes = {
  blogPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired
};

export default memo(Routing);

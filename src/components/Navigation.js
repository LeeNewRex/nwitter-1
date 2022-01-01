import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faSnowflake, faComments } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link to="/" style={{ marginRight: 15 }}>
          <FontAwesomeIcon icon={faSnowflake} color={"#c404ff"} size="2x" />
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#c404ff"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </span>
        </Link>
      </li>
      <li>
        <Link to="/random_chat" style={{ marginLeft: 15 }}>
          <FontAwesomeIcon icon={faComments} color={"#c404ff"} size="2x"/>
        </Link>             
      </li>
    </ul>
  </nav>
);
export default Navigation;

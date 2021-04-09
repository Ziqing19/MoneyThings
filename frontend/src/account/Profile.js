import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Modal from "../shared/Modal";
import InputBox from "../shared/InputBox";

export default function Profile(props) {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [avatar, setAvatar] = useState("../images/avatar/0.png");
  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState("");

  useEffect(() => {
    if (props.user) {
      setAvatarIndex(props.user.avatar);
      setUsername(props.user.username);
      setBiography(props.user.biography);
    }
  }, [props.user]);

  useEffect(() => {
    setAvatar(`../images/avatar/${avatarIndex}.png`);
  }, [avatarIndex]);

  function handleSubmit() {
    const data = {
      username: username,
      avatar: avatarIndex,
      biography: biography,
    };
    fetch("/user/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        console.log(resRaw);
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          alert("Profile updated");
          window.location = "/";
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="flex-container d-flex flex-column justify-content-center pb-5">
      <div className="d-flex justify-content-center align-items-center mb-5">
        <img
          className="me-5"
          src={avatar}
          alt="avatar"
          width="200"
          height="200"
          data-bs-toggle="modal"
          data-bs-target="#avatar_modal"
        />
        <div>
          <div className="fw-light">Username:</div>
          <h1
            className="mb-0"
            data-bs-toggle="modal"
            data-bs-target="#username_modal"
          >
            {username}
          </h1>
        </div>
      </div>
      <div className="d-flex justify-content-center ms-5 mb-5">
        <div className="justify-content-start ms-5">
          <div className="fw-light">Biography:</div>
          <h2
            className="mb-5"
            data-bs-toggle="modal"
            data-bs-target="#biography_modal"
          >
            {biography}
          </h2>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-secondary" onClick={handleSubmit}>
          Apply Changes
        </button>
      </div>
      <Modal
        id="avatar_modal"
        Content={UpdateAvatar}
        dataHandler={setAvatarIndex}
      />
      <Modal
        id="username_modal"
        Content={UpdateUsername}
        dataHandler={setUsername}
      />
      <Modal
        id="biography_modal"
        Content={UpdateBiography}
        dataHandler={setBiography}
      />
    </div>
  );
}

Profile.propTypes = {
  user: propTypes.object.isRequired,
  setUser: propTypes.func.isRequired,
};

function UpdateAvatar({ dataHandler }) {
  return (
    <div className="row">
      {[...Array(9).keys()].map((item, index) => (
        <div
          className="col-4"
          key={"avatar-" + index}
          onClick={() => {
            dataHandler(index);
          }}
        >
          <div className="ratio ratio-1x1">
            <img src={`../images/avatar/${index}.png`} alt="avatar" />
          </div>
        </div>
      ))}
    </div>
  );
}

UpdateAvatar.propTypes = {
  dataHandler: propTypes.func.isRequired,
};

function UpdateUsername({ dataHandler }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    dataHandler(value);
  }, [dataHandler, value]);

  return (
    <div>
      <InputBox
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        required={true}
        label="Username"
      />
    </div>
  );
}

UpdateUsername.propTypes = {
  dataHandler: propTypes.func.isRequired,
};

function UpdateBiography({ dataHandler }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    dataHandler(value);
  }, [dataHandler, value]);

  return (
    <div>
      <InputBox
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        required={true}
        label="Biography"
      />
    </div>
  );
}

UpdateBiography.propTypes = {
  dataHandler: propTypes.func.isRequired,
};

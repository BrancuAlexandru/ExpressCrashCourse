let members = require("../../Members");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const logger = require('../../middleware/logger');

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const memberExists =
    members.filter((member) => member.id === parseInt(req.params.id)).length >= 1 ? true : false;

  if (memberExists) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ error: `No user found by ID of ${req.params.id}.` });
  }
});

router.post("/", logger, (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ error: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(newMember);
});

router.put("/:id", (req, res) => {
  const memberExists =
    members.filter((member) => member.id === parseInt(req.params.id)).length >= 1 ? true : false;

  if (memberExists) {
    const updatedMember = req.body;

    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({ message: "The member was updated", member });
      }
    });
  } else {
    res.status(404).json({ error: `No user found by ID of ${req.params.id}.` });
  }
});

router.delete("/:id", (req, res) => {
  const memberExists = members.filter((member) => member.id === parseInt(req.params.id)).length >= 1 ? true : false;

  if (memberExists) {
    members = members.filter((member) => member.id !== parseInt(req.params.id));
    res.json({ message: "Member Deleted Successfully.", members: members });
  } else {
    res.status(404).json({ error: `No user found by ID of ${req.params.id}.` });
  }
});

module.exports = router;

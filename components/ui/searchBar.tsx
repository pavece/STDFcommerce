import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useState } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search/${query}`);
      }}
    >
      <TextField
        placeholder="Search Products"
        fullWidth={true}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
        sx={{
          maxWidth: "600px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </form>
  );
};

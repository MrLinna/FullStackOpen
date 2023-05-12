import { FlatList, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import React from "react";
import { SearchBar } from "react-native-elements";
import { useDebounce } from "@react-hooks-library/core";

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("lastest");
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedText = useDebounce(searchFilter, 1000);

  const searchParams = { orderBy: orderBy, searchFilter: debouncedText };
  return (
    <View>
      <Search setSearchFilter={setSearchFilter} />
      <DropDown setSortBy={setOrderBy} />
      <QueryHandler parameters={searchParams} />
    </View>
  );
};

const Search = ({ setSearchFilter }) => {
  const [filter, setFilter] = useState("");
  const handle = (value) => {
    setFilter(value);
    setSearchFilter(value);
  };
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={(value) => handle(value)}
      value={filter}
    />
  );
};
const DropDown = ({ setSortBy }) => {
  const [constToShow, setConstToShow] = useState("lastest");

  const handleChange = (value) => {
    setSortBy(value);
    setConstToShow(value);
  };

  return (
    <View>
      <Picker
        style={{ height: 70 }}
        selectedValue={constToShow}
        onValueChange={(itemValue) => handleChange(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="lastest" />
        <Picker.Item label="Highest rated repositories" value="DESC" />
        <Picker.Item label="Lowest rated repositories" value="ASC" />
      </Picker>
    </View>
  );
};

const QueryHandler = ({ parameters }) => {
  const { repositories } = useRepositories(parameters);

  return <RepositoryListContainer repositories={repositories} />;
};

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return <RepositoryItem item={item} />;
  };
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;

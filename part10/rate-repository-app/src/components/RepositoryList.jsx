import { FlatList, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("lastest");

  return (
    <View>
      <DropDown setSortBy={setOrderBy} />
      <QueryHandler parameters={orderBy} />
    </View>
  );
};

const DropDown = ({ setSortBy }) => {
  const [constToShow, setConstToShow] = useState("lastest");
  const handleChange = (value) => {
    setSortBy(value);
    setConstToShow(value);
  };
  return (
    <Picker
      style={{ height: 70 }}
      selectedValue={constToShow}
      onValueChange={(itemValue) => handleChange(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="lastest" />
      <Picker.Item label="Highest rated repositories" value="DESC" />
      <Picker.Item label="Lowest rated repositories" value="ASC" />
    </Picker>
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

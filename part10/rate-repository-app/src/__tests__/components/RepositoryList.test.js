import React from "react";
import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const initial0 = repositories.edges[0].node;
      const initial1 = repositories.edges[1].node;

      const repositoryNames = screen.getAllByTestId("fullName");
      const [firstRepositoryName, secondRepositoryName] = repositoryNames;
      expect(firstRepositoryName).toHaveTextContent(initial0.fullName);
      expect(secondRepositoryName).toHaveTextContent(initial1.fullName);

      const repdescs = screen.getAllByTestId("description");
      const [firstRepositoryDesc, secondRepositoryItem] = repdescs;
      expect(firstRepositoryDesc).toHaveTextContent(initial0.description);
      expect(secondRepositoryItem).toHaveTextContent(initial1.description);

      const replang = screen.getAllByTestId("language");
      const [firstRepositoryStar, secondRepositoryStar] = replang;
      expect(firstRepositoryStar).toHaveTextContent(initial0.language);
      expect(secondRepositoryStar).toHaveTextContent(initial1.language);

      const repstars = screen.getAllByTestId("stars");
      const [firstRepositoryLang, secondRepositoryLang] = repstars;
      expect(firstRepositoryLang).toHaveTextContent(
        String((initial0.stargazersCount / 1000).toFixed(1)).replace(
          /\.0+$/,
          ""
        ) + "k"
      );
      expect(secondRepositoryLang).toHaveTextContent("1.8k");

      const repforks = screen.getAllByTestId("forks");
      const [firstRepositoryFork, secondRepositoryFork] = repforks;
      expect(firstRepositoryFork).toHaveTextContent(
        String((initial0.forksCount / 1000).toFixed(1)).replace(/\.0+$/, "") +
          "k"
      );
      expect(secondRepositoryFork).toHaveTextContent("69");

      const reprev = screen.getAllByTestId("reviews");
      const [firstReposittoryRev, secondRepositoryRev] = reprev;
      expect(firstReposittoryRev).toHaveTextContent("3");
      expect(secondRepositoryRev).toHaveTextContent("3");

      const reprating = screen.getAllByTestId("ratingAvg");
      const [firstReposittoryRat, secondRepositoryRat] = reprating;
      expect(firstReposittoryRat).toHaveTextContent("88");
      expect(secondRepositoryRat).toHaveTextContent("72");
    });
  });
});

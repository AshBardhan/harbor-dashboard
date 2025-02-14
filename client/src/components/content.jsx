import { useEffect, useState } from "react";
import Card from "./card";
import Dropdown from "./dropdown";
import Text from "./text";
import {
  Status,
  StatusColorMapping,
  statusIconMap,
  StatusLabelMapping,
} from "../constants/status";
import { SortOptions, SortType } from "../constants/sort";
import Flexbox from "./flexbox";
import { ReactComponent as AddIcon } from "../assets/icons/add.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Content() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState(SortType.ASC);
  const [filterBy, setFilterBy] = useState(Status.ALL);
  const [filterOptions, setFilterOptions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/testnets`)
      .then((response) => response.json())
      .then((data) => {
        let testList = data.data.testnet;
        setItems(testList);
        setFilteredItems(testList);
        const statusCount = Object.entries(
          testList.reduce((acc, { status }) => {
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          }, {}),
        );
        setFilterOptions([
          {
            label: `${StatusLabelMapping[Status.ALL]} (${testList.length})`,
            value: Status.ALL,
            color: StatusColorMapping[Status.ALL],
            icon: statusIconMap[Status.ALL],
          },
          ...statusCount.map(([status, count]) => ({
            label: `${StatusLabelMapping[status]} (${count})`,
            value: status,
            color: StatusColorMapping[status],
            icon: statusIconMap[status],
          })),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterParam = searchParams.get("filterBy");
    const sortParam = searchParams.get("sortBy");

    filterParam && setFilterBy(filterParam);
    sortParam && setSortBy(sortParam);
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("filterBy", filterBy);
    searchParams.set("sortBy", sortBy);

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [filterBy, sortBy, navigate, location.pathname]);

  useEffect(() => {
    let filtered =
      filterBy === Status.ALL
        ? [...items]
        : [...items].filter((item) => item.status === filterBy);
    filtered.sort((a, b) => {
      switch (sortBy) {
        case SortType.DESC:
          return b.name.localeCompare(a.name);
        case SortType.STATUS:
          return a.status.localeCompare(b.status);
        case SortType.CREATED_AT:
          return +new Date(a.created_at) - +new Date(b.created_at);
        case SortType.UPDATED_AT:
          return +new Date(a.updated_at) - +new Date(b.updated_at);
        default:
        case SortType.ASC:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredItems(filtered);
  }, [sortBy, filterBy, items]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const onSortChange = (value) => {
    setSortBy(value);
  };

  const onFilterChange = (value) => {
    setFilterBy(value);
  };

  return (
    <>
      <Flexbox
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Flexbox alignItems="center" gap="20px">
          <Text type="h2">Testnets ({filteredItems.length || 0})</Text>
          <button type="button" className="inline-button inline-button--big">
            <AddIcon width="14" height="14" />
            <span>New Testnet</span>
          </button>
        </Flexbox>
        <Flexbox alignItems="center" gap="10px">
          {filterOptions.length > 0 && (
            <>
              <Dropdown
                label="Filter by:"
                options={filterOptions}
                selected={filterBy}
                onChange={onFilterChange}
              ></Dropdown>
              <span className="dot"></span>
            </>
          )}
          <Dropdown
            label="Sort by:"
            options={SortOptions}
            selected={sortBy}
            onChange={onSortChange}
          ></Dropdown>
        </Flexbox>
      </Flexbox>
      {filteredItems.map((item) => (
        <Card key={item.id} data={item}></Card>
      ))}
    </>
  );
}

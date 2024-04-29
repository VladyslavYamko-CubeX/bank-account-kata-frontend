"use client";
import React, { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

import TransactionsTable from "@/components/Table";

const SearchMovements = ({}) => {
  const [type, setType] = useState<"deposit" | "withdrawal" | "all">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statement, setStatement] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStatement = useCallback(
    async (page?: number) => {
      const response = await apiService.searchMovements(
        type,
        startDate,
        endDate,
        sortOrder,
        page
      );
      setStatement(response.data.transactions);
      if (response.data.totalPages < currentPage) {
        setCurrentPage(response.data.totalPages);
      }
      setTotalPages(response.data.totalPages);
    },
    [endDate, sortOrder, startDate, type]
  );

  useEffect(() => {
    fetchStatement(currentPage);
  }, [fetchStatement, currentPage]);

  return (
    <Box>
      <Box>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "deposit" | "withdrawal" | "all")
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="deposit">Deposits</MenuItem>
            <MenuItem value="withdrawal">Withdrawals</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          label="Start Date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          label="End Date"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        {/* <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button> */}
      </Box>
      <TransactionsTable
        data={statement}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        disableSort
      />
    </Box>
  );
};

export default SearchMovements;

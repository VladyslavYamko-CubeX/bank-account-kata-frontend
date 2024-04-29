"use client";

import {
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function TransactionsTable({
  data,
  sortOrder,
  setSortOrder,
  disableSort = false,
  currentPage = 1,
  totalPages = 10,
  setCurrentPage,
}) {
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log("data:", data);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {!disableSort ? (
                  <TableSortLabel
                    active
                    direction={sortOrder as "asc" | "desc"}
                    onClick={handleSort}
                  >
                    Date
                  </TableSortLabel>
                ) : (
                  "Date"
                )}
              </TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>${item.balance}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          First
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
        <Button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Last
        </Button>
      </Box>
    </Box>
  );
}

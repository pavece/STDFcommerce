import React from "react";
import { GetServerSideProps } from "next";
import { getAllUsers } from "../../../db/functions/usersDb";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../../../interfaces/userInterface";
import { MainLayout } from "../../../components/layouts/mainLayout";
import { Typography, Select, MenuItem, Alert } from "@mui/material";
import { useState } from "react";
import { stdfApi } from "../../../api/stdfApi";
import Snackbar from "@mui/material/Snackbar";

const UsersPage = ({ users }: { users: IUser[] }) => {
  const [userList, setUserList] = useState<IUser[]>(users);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<any>("success");

  const updateUserRole = async (e: any, userId: string) => {
    const newRole = e.target.value;
    try {
      const { data } = await stdfApi.put("/api/admin/users/role", {
        userId,
        newRole,
      });
      setUserList(data.users);
      setAlertSeverity("success");
      setAlertMessage(data.status);
      setAlertVisible(true);
    } catch (error: any) {
      setUserList(users);
      setAlertSeverity("error");
      setAlertMessage(error.response.data.status);
      setAlertVisible(true);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "User ID", width: 200 },
    { field: "email", headerName: "User E-mail", width: 200 },
    {
      field: "role",
      headerName: "User role",
      width: 200,
      renderCell: (params) => {
        const user = userList.filter((user) => user._id == params.row.id)[0];

        return (
          <>
            <Select
              value={user.role}
              fullWidth
              onChange={(e) => {
                updateUserRole(e, params.row.id);
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </>
        );
      },
    },
  ];
  const rows = userList.map((user: IUser) => {
    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  });

  return (
    <MainLayout
      title="Users"
      description="View and edit users"
      showSearchBar={false}
    >
      <Snackbar
        open={alertVisible}
        autoHideDuration={3000}
        onClose={() => {
          setAlertVisible(false);
        }}
      >
        <Alert severity={alertSeverity}>{alertMessage}</Alert>
      </Snackbar>
      <Typography variant="h4" component="h1">
        Users
      </Typography>
      <div style={{ height: "70vh", minHeight: "400px", marginTop: "20px" }}>
        <DataGrid columns={columns} rows={rows}></DataGrid>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const users = await getAllUsers();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default UsersPage;

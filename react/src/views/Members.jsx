import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Members() {
  const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { setNotification } = useStateContext();

    useEffect(() => {
        getMembers();
        
      }, []);

      const onDeleteClick = (member) => {
        console.log("delete clicked", member);
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return;
        }
        axiosClient
          .delete(`/member/${member.id}`)
          .then(() => {
            setNotification("Member was successfully deleted");
            getMembers();
          });
      };

    const getMembers = () => {
        setLoading(true);
        axiosClient
            .get("/member")
            .then(({ data }) => {
                setLoading(false);
                setMembers(data);
                
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    return (
        <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "",
        }}
      >
        <h1>Members</h1>
        <Link className="btn-add" to="/members/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Join Date</th>
              <th>Membership Plan</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" class="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
                
              {members.map((m) => (
                <tr key={m.id}>
                  <td>{m.first_name + " " + m.last_name}</td>
                  <td>{m.date_of_birth}</td>
                  <td>{m.email}</td>
                  <td>{m.phone_number}</td>
                  <td>{m.address}</td>
                  <td>{m.join_date}</td>
                  <td>{m.membership_plan_name}</td>
                  <td>{m.status}</td>
                  <td>{m.created_at}</td>
                  <td>
                    <Link
                      className="btn-edit"
                      to={"/members/" + m.id}
                    >
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(m)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
    );

}
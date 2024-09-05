import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function MembershipPlan() {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getMembershipPlans();
  }, []);

  const onDeleteClick = (membershipPlan) => {
    console.log("delete clicked", membershipPlan);
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient
      .delete(`/membership-plans/${membershipPlan.membership_plan_id}`)
      .then(() => {
        setNotification("Membership Plan was successfully deleted");
        getMembershipPlans();
      });
  };

  const getMembershipPlans = () => {
    setLoading(true);
    axiosClient
      .get("/membership-plans")
      .then(({ data }) => {
        setLoading(false);
        setMembershipPlans(data.data);
        console.log("membershipPlans", membershipPlans);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "",
        }}
      >
        <h1>Membership Plans</h1>
        <Link className="btn-add" to="/membership-plans/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration Months</th>
              <th>Price</th>
              <th>Description</th>
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
              {membershipPlans.map((m) => (
                <tr key={m.membership_plan_id}>
                  <td>{m.plan_name}</td>
                  <td>{m.duration_months}</td>
                  <td>{m.price}</td>
                  <td>{m.description}</td>
                  <td>{m.created_at}</td>
                  <td>
                    <Link
                      className="btn-edit"
                      to={"/membership-plans/" + m.membership_plan_id}
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

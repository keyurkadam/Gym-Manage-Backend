import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function MembershipPlanForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [membershipPlan, setMembershipPlan] = useState({
    membership_plan_id: null,
    plan_name: "",
    price: "",
    duration_months: "",
    description: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/membership-plans/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setMembershipPlan(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (membershipPlan.membership_plan_id) {
      axiosClient
        .put(
          `/membership-plans/${membershipPlan.membership_plan_id}`,
          membershipPlan
        )
        .then(() => {
          setNotification("Membership Plan was successfully updated");
          navigate("/membership-plans");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/membership-plans", membershipPlan)
        .then(() => {
          setNotification("Membership Plan was successfully created");
          navigate("/membership-plans");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {membershipPlan.membership_plan_id && (
        <h1>Update Membership Plan: {membershipPlan.plan_name}</h1>
      )}
      {!membershipPlan.membership_plan_id && <h1>New membershipPlan</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={membershipPlan.plan_name}
              onChange={(ev) =>
                setMembershipPlan({
                  ...membershipPlan,
                  plan_name: ev.target.value,
                })
              }
              placeholder="Plan Name"
            />
            <input
              value={membershipPlan.duration_months}
              onChange={(ev) =>
                setMembershipPlan({
                  ...membershipPlan,
                  duration_months: ev.target.value,
                })
              }
              placeholder="Duration Months"
            />
            <input
              value={membershipPlan.price}
              onChange={(ev) =>
                setMembershipPlan({ ...membershipPlan, price: ev.target.value })
              }
              placeholder="Price"
            />
            <input
              value={membershipPlan.description}
              onChange={(ev) =>
                setMembershipPlan({
                  ...membershipPlan,
                  description: ev.target.value,
                })
              }
              placeholder="Description"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}

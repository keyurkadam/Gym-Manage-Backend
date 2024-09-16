import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function MemberForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [member, setMember] = useState({
    id: null,
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    date_of_birth: "",
    phone_number: "",
    join_date: "",
    membership_plan_name: "",
    status: "",
  });
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  

  useEffect(() => {

    axiosClient.get("/membership-plans").then(({data}) => {
        console.log("membership-plan", data);
        setMembershipPlans(data.data);
    });

    if (id) {
        setLoading(true);
        axiosClient
          .get(`/member/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setMember(data); // Populate form with existing member data
          })
          .catch(() => {
            setLoading(false);
          });
      }
  }, [id])

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (member.id) {
        axiosClient
        .put(`/member/${member.id}`, member)
        .then(() => {
          setNotification("Member was successfully updated");
          navigate("/members"); // Redirect to the members list
        })
        .catch((err) => {
          const response = err.response;
          console.log("response", response);
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/member", member)
        .then(() => {
          setNotification("Member was successfully created");
          navigate("/members");
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
      {member.id ? <h1>Update Member: {member.first_name} {member.last_name}</h1> : <h1>New Member</h1>}
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
              value={member.first_name}
              onChange={(ev) => setMember({ ...member, first_name: ev.target.value })}
              placeholder="First Name"
            />
            <input
              value={member.last_name}
              onChange={(ev) => setMember({ ...member, last_name: ev.target.value })}
              placeholder="Last Name"
            />
            <input
              value={member.email}
              onChange={(ev) => setMember({ ...member, email: ev.target.value })}
              placeholder="Email"
              type="email"
            />
            <input
              value={member.address}
              onChange={(ev) => setMember({ ...member, address: ev.target.value })}
              placeholder="Address"
              type="address"
            />
            <input
              value={member.date_of_birth}
              onChange={(ev) => setMember({ ...member, date_of_birth: ev.target.value })}
              placeholder="Date of Birth"
              type="date"
            />
            <input
              value={member.phone_number}
              onChange={(ev) => setMember({ ...member, phone_number: ev.target.value })}
              placeholder="Phone Number"
            />
            <input
              value={member.join_date}
              onChange={(ev) => setMember({ ...member, join_date: ev.target.value })}
              placeholder="Join Date"
              type="date"
            />
            
            <select
              value={member.membership_plan_name}
              onChange={(ev) =>
                setMember({ ...member, membership_plan_name: ev.target.value })
              }
            >
              <option value="">Select Membership Plan</option>
              {membershipPlans.map((plan) => (
                <option key={plan.membership_plan_id} value={plan.plan_name}>
                  {plan.plan_name}
                </option>
              ))}
            </select>
            <select
              value={member.status}
              onChange={(ev) => setMember({ ...member, status: ev.target.value })}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
    
  );
}

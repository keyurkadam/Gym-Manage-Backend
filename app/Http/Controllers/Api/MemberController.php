<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Models\MembershipPlans;

class MemberController extends Controller
{
    /**
     * Display a listing of the members.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $members = Member::with('membershipPlan')->get();
        return response()->json($members->map(function ($member) {
            return [
                'id' => $member->id,
                'first_name' => $member->first_name,
                'last_name' => $member->last_name,
                'email' => $member->email,
                'phone_number' => $member->phone_number,
                'address' => $member->address,
                'date_of_birth' => $member->date_of_birth,
                'join_date' => $member->join_date,
                'status' => $member->status,
                // Include the membership plan name
                'membership_plan_name' => $member->membershipPlan ? $member->membershipPlan->plan_name : null,
            ];
        }));
    }

    /**
     * Store a newly created member in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreMemberRequest $request)
    {
        
        $data = $request->validated();

        $membershipPlan = MembershipPlans::where('plan_name', $data['membership_plan_name'])->first();

        if (!$membershipPlan) {
            return response()->json(['message' => 'Membership Plan not found'], 404);
        }

        // Update the membership_plan_id based on the plan name
        $data['membership_plan_id'] = $membershipPlan->membership_plan_id;

        $member = Member::create($data);

        return response()->json($member, 201);
    }

    /**
     * Display the specified member.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $member = Member::with('membershipPlan')->find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        
        return response()->json([
            'id' => $member->id,
            'first_name' => $member->first_name,
            'last_name' => $member->last_name,
            'email' => $member->email,
            'phone_number' => $member->phone_number,
            'address' => $member->address,
            'date_of_birth' => $member->date_of_birth,
            'join_date' => $member->join_date,
            'status' => $member->status,
            // Return the membership plan name
            'membership_plan_name' => $member->membershipPlan ? $member->membershipPlan->plan_name : null,
        ]);
    }

    /**
     * Update the specified member in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateMemberRequest $request, $id)
    {
        
        $member = Member::findOrFail($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        $data = $request->validated();

        $membershipPlan = MembershipPlans::where('plan_name', $data['membership_plan_name'])->first();

        if (!$membershipPlan) {
            return response()->json(['message' => 'Membership Plan not found'], 404);
        }

        // Update the membership_plan_id based on the plan name
        $data['membership_plan_id'] = $membershipPlan->membership_plan_id;
       
        $member->update($data);

        return response()->json($member);
    }

    /**
     * Remove the specified member from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json(['message' => 'Member not found'], 404);
        }

        $member->delete();

        return response()->json(['message' => 'Member deleted successfully']);
    }
}

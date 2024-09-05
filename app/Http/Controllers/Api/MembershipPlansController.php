<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMembershipPlanRequest;
use App\Http\Requests\UpdateMembershipPlanRequest;
use App\Http\Resources\MembershipPlansResource;
use App\Models\MembershipPlans;

class MembershipPlansController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $membershipPlans = MembershipPlans::all();
        return MembershipPlansResource::collection($membershipPlans);
                
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMembershipPlanRequest $request)
    {
        $data = $request->validated();
        $MembershipPlan = MembershipPlans::create($data);

        return response(new MembershipPlansResource($MembershipPlan) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($membership_plan_id)
    {
        $membershipPlan = MembershipPlans::findOrFail($membership_plan_id);
        return response($membershipPlan);
        // return new MembershipPlansResource($MembershipPlans);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMembershipPlanRequest $request, $membership_plan_id)
    {
        $membershipPlan = MembershipPlans::findOrFail($membership_plan_id);
        $data = $request->validated();
        $membershipPlan->update($data);

        return response(new MembershipPlansResource($membershipPlan) , 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($membership_plan_id)
    {
        $membershipPlan = MembershipPlans::findOrFail($membership_plan_id);
        $membershipPlan->delete();

        return response("",204);
    }
}

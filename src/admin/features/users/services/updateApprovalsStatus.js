import { supabase } from '../../../../common/supabase/supabaseClient';

export const userApprovalsStatusUpdate = async (userId, departmentId, isApprove) => {
  try {
    const { data: userAuth } = await supabase.auth.getUser();
    const { data: memberRoleId } = await supabase
      .from('roles')
      .select('id')
      .eq('department_id', departmentId)
      .eq('role', 'member')
      .single();

    const [
      { data: department_memberships, error: catError },
      { data: user_departments, error: tagError },
      { data: user_roles, error: settingError },
    ] = await Promise.all([
      supabase
        .from('department_memberships')
        .update({ status: isApprove ? 'approved' : 'rejected' })
        .eq('user_id', userId)
        .select()
        .single(),

      supabase
        .from('user_departments')
        .insert({
          user_id: userId,
          department_id: departmentId,
          assigned_id: userAuth.user.id,
        })
        .select()
        .single(),

      supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role_id: memberRoleId.id,
          department_id: departmentId,
        })
        .select()
        .single(),
    ]);

    if (catError || tagError || settingError) {
      console.error('there was a problem update user approvals status: ');
    }

    return { department_memberships, user_departments, user_roles };
  } catch (error) {
    console.error('Insert failed:', error);
    throw error;
  }
};

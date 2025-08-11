import { supabase } from '../../../../common/supabase/supabaseClient';

export const userApprovalsStatusUpdate = async (userId, isApprove) => {
  try {
    const { error } = await supabase
      .from('department_memberships')
      .update({ status: isApprove ? 'approved' : 'rejected' })
      .eq('user_id', userId);

    if (error) {
      console.error('there was a problem update user approvals status: ', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error('an error occurred: ', error);
  }

  return isApprove;
};

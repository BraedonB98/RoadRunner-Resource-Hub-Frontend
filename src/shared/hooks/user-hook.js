import { useState, useCallback } from "react";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
    preferredName: null,
    gender: null,
    pronouns: null,
    imageUrl: `data/uploads/images/default.svg`,
    accounts: null, //Admin, Faculty, Student, Staff, Industry Partner
    signedInAs: null,
    accountID: null,
    schoolID: null,
    accountValues: null,
  });

  const setUser = useCallback((user, account, signInAs) => {
    let newAccounts = {
      admin: user.adminAccount || null,
      faculty: user.facultyAccount || null,
      student: user.studentAccount || null,
      staff: user.staffAccount || null,
      industryPartner: user.contactAccount || null,
    };
    let newAccountID;
    let newSchoolID;
    let newAccountValues;

    //creating accounts array

    //Checking if user has that type of account
    if (signInAs === "Student" && newAccounts.student) {
      newAccountID = account._id;
      newSchoolID = account.schoolStudentId;
      newAccountValues = {
        alumni: account.alumni,
        advisors: account.advisors,
        academicDetails: account.academicDetails,
        careerProfiles: account.careerProfiles,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else if (signInAs === "Faculty" && newAccounts.faculty) {
      newAccountID = account._id;
      newSchoolID = account.schoolFacultyId;
      newAccountValues = {
        universityStructure: account.universityStructure,
        engagementPostings: account.engagementPostings,
        permissions: account.permissions,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else if (signInAs === "Staff" && newAccounts.staff) {
      newAccountID = account._id;
      newSchoolID = account.schoolStaffId;
      newAccountValues = {
        advisorFor: account.advisorFor,
        universityStructure: account.universityStructure,
        engagementPostings: account.engagementPostings,
        permissions: account.permissions,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else if (signInAs === "Industry Partner" && newAccounts.industryPartner) {
      newAccountID = account._id;
      newSchoolID = account.schoolContactId;
      newAccountValues = {
        title: account.title,
        qualifications: account.qualifications,
        industry: account.permissions,
        employer: account.employer,
        careerPostings: account.careerPostings,
        permissions: account.permissions,
        preferences: account.preferences,
      };
    } else if (signInAs === "Admin" && newAccounts.admin) {
      newAccountID = account._id;
      newSchoolID = account.schoolAdminId;
      newAccountValues = {
        universityStructure: account.universityStructure,
        engagementPostings: account.engagementPostings,
        permissions: account.permissions,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else {
      return "Error: You do not have a " + signInAs + " account.";
    }

    let newUserInfo = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      preferredName: user.preferredName,
      gender: user.gender,
      pronouns: user.pronouns,
      imageUrl: user.imageUrl,
      accounts: newAccounts,
      signedInAs: signInAs,
      accountID: newAccountID,
      schoolID: newSchoolID,
      accountValues: newAccountValues,
    };
    setUserInfo(newUserInfo);
  }, []);

  const updateAccount = useCallback((uid, accountType) => {}, []);

  const removeUser = useCallback(() => {
    setUserInfo({
      firstName: null,
      middleName: null,
      lastName: null,
      email: null,
      preferredName: null,
      gender: null,
      pronouns: null,
      imageUrl: `data/uploads/images/default.svg`,
      accounts: null, //Admin, Faculty, Student, Staff, Industry Partner
      signedInAs: null,
      accountID: null,
      schoolID: null,
      accountValues: null,
    });
  }, []);

  const switchAccount = useCallback((account, signInAs) => {
    let newAccountValues;
    if (signInAs === "Student" && userInfo.accounts.student) {
      newAccountValues = {
        alumni: account.alumni,
        advisors: account.advisors,
        academicDetails: account.academicDetails,
        careerProfiles: account.careerProfiles,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else if (signInAs === "Faculty" && userInfo.accounts.faculty) {
      newAccountValues = {
        universityStructure: account.universityStructure,
        engagementPostings: account.engagementPostings,
        permissions: account.permissions,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else if (signInAs === "Staff" && userInfo.accounts.staff) {
      newAccountValues = {
        advisorFor: account.advisorFor,
        universityStructure: account.universityStructure,
        engagementPostings: account.engagementPostings,
        permissions: account.permissions,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else if (
      signInAs === "Industry Partner" &&
      userInfo.accounts.industryPartner
    ) {
      newAccountValues = {
        title: account.title,
        qualifications: account.qualifications,
        industry: account.permissions,
        employer: account.employer,
        careerPostings: account.careerPostings,
        permissions: account.permissions,
        preferences: account.preferences,
      };
    } else if (signInAs === "Admin" && userInfo.accounts.admin) {
      newAccountValues = {
        universityStructure: account.universityStructure,
        engagementPostings: account.engagementPostings,
        permissions: account.permissions,
        dashboard: account.dashboard,
        preferences: account.preferences,
      };
    } else {
      return "Error: You do not have a " + signInAs + " account.";
    }
    let newUserInfo = {
      ...userInfo,
      signedInAs: signInAs,
      accountID: account._id,
      schoolID:
        signInAs === "Student"
          ? account.schoolStudentId
          : signInAs === "Faculty"
          ? account.schoolFacultyId
          : signInAs === "Staff"
          ? account.schoolStaffId
          : signInAs === "Industry Partner"
          ? account.schoolContactId
          : account.schoolAdminId,
      accountValues: newAccountValues,
    };
    setUserInfo(newUserInfo);
  }, []);

  return {
    userInfo,
    setUser,
    removeUser,
    switchAccount,
    updateAccount,
  };
};

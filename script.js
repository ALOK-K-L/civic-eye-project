// Import the necessary Firebase services from your configuration file
import { auth, db } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// --- HELPER FUNCTION to calculate distance between two lat/lng points ---
export function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // in metres
}

// --- NEW: Admin Function to create Authorized User in Database with department ---
// !! BUGGY !! This function is the cause of your permissions error.
// It uses addDoc() which creates a random ID.
// DO NOT USE THIS. Manually create users in the console.
export async function createAuthorizedUserInDB(name, email, department) {
    try {
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            role: "Authorized User",
            department: department, 
            createdAt: serverTimestamp()
        });
        alert(`User profile for ${name} created successfully.\n\nIMPORTANT: For the demo, you must now go to the Firebase Authentication console and manually create a user with the email '${email}' and any password.`);
    } catch (error) {
        alert("Error creating user profile: " + error.message);
    }
}

// --- NEW: Admin Function to fetch all Authorized Users ---
export async function fetchAuthorizedUsers() {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "Authorized User"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ uid: doc.id, ...doc.data() });
    });
    return users;
}

// --- ISSUE SUBMISSION (using imgbb for photos) ---
export async function submitIssue(photoFile, description, tags, lat, lng, userID) {
  if (!photoFile || !description) { alert("Please fill all fields and attach a photo."); return; }
  const imgbbApiKey = '58fb22547f9637cb02d893e3c86baf1b';
  const formData = new FormData();
  formData.append('image', photoFile);
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, { method: 'POST', body: formData });
    const result = await response.json();
    if (!result.success) { throw new Error(`Image upload failed: ${result.error.message}`); }
    const photoURL = result.data.url;
    await addDoc(collection(db, "issues"), {
      userID, description, photoURL, tags, status: "Pending", timestamp: serverTimestamp(),
      location: { latitude: lat, longitude: lng }
    });
    alert("Issue submitted successfully!");
  } catch (error) { alert("Error submitting issue: " + error.message); }
}

// --- DATA FETCHING (with NEW department-specific functions) ---
export async function fetchAllIssues() {
  const snapshot = await getDocs(collection(db, "issues"));
  const issues = [];
  snapshot.forEach(doc => { issues.push({ id: doc.id, ...doc.data() }); });
  return issues;
}

export async function fetchCitizenIssues(userID) {
    if (!userID) return [];
    const q = query(collection(db, "issues"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const issues = [];
    querySnapshot.forEach((doc) => { issues.push({ id: doc.id, ...doc.data() }); });
    return issues;
}

export async function fetchDepartmentIssues(departmentTag) {
  if (!departmentTag) return [];
  const q = query(collection(db, "issues"), where("tags", "array-contains", departmentTag));
  const querySnapshot = await getDocs(q);
  const issues = [];
  querySnapshot.forEach((doc) => { issues.push({ id: doc.id, ...doc.data() }); });
  return issues;
}

// --- STATUS UPDATE & DELETE (UPDATED FOR NOTIFICATIONS) ---
export async function updateIssueStatus(issueID, newStatus, adminId, citizenUserID) {
  try {
    // 1. Update the document in Firestore
    await updateDoc(doc(db, "issues", issueID), { 
        status: newStatus,
        lastUpdatedBy: adminId
    });

    // 2. Create the notification in Local Storage for the specific citizen
    const notification = {
        id: `notif_${new Date().getTime()}`,
        message: `Your issue (ID: ${issueID.substring(0, 6)}...) has been updated to "${newStatus}".`,
        timestamp: new Date().toISOString(),
        read: false
    };

    // Get existing notifications for that user, or create a new array
    const storageKey = `notifications_${citizenUserID}`;
    let notifications = JSON.parse(localStorage.getItem(storageKey)) || [];
    notifications.push(notification);

    // Save back to Local Storage
    localStorage.setItem(storageKey, JSON.stringify(notifications));

  } catch (error) { 
    console.error("Error updating status:", error);
    alert("Error updating status: " + error.message); 
  }
}

export async function deleteIssue(issueID) {
  try {
    await deleteDoc(doc(db, "issues", issueID));
    alert("Issue successfully deleted.");
  } catch (error) { alert("Error deleting issue: " + error.message); }
}

// --- AUTHENTICATION ---
export function logout() {
  signOut(auth).then(() => { window.location.href = "index.html"; });
}

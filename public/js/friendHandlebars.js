// document.addEventListener('DOMContentLoaded', () => {
//     // Function to send a friend request
//     const friendSearchForm = document.getElementById('friend-search-form');
//     const friendUsernameInput = document.getElementById('friend-username');
  
//     friendSearchForm.addEventListener('submit', async (event) => {
//       event.preventDefault();
  
//       const friendUsername = friendUsernameInput.value;
  
//       try {
//         const response = await fetch('/api/friends/request', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ recipientUsername: friendUsername }),
//         });
  
//         if (response.ok) {
//           alert('Friend request sent!');
//           // Clear the input field
//           friendUsernameInput.value = ''; 
//         } else {
//           alert('Error sending friend request');
//         }
//       } catch (error) {
//         console.error(error);
//         alert('Error sending friend request');
//       }
//     });
  
//     // Function to accept a friend request
//     const acceptButtons = document.querySelectorAll('.accept-friend');
    
//     acceptButtons.forEach((acceptButton) => {
//       acceptButton.addEventListener('click', async () => {
//         const friendId = acceptButton.dataset.friendId;
  
//         try {
//           const response = await fetch(`/api/friends/${friendId}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status: 'accepted' }),
//           });
  
//           if (response.ok) {
//             alert('Friend request accepted!');
//           } else {
//             alert('Error accepting friend request');
//           }
//         } catch (error) {
//           console.error(error);
//           alert('Error accepting friend request');
//         }
//       });
//     });
//   });
  
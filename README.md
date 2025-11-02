# College Complaint Management System

A comprehensive MEAN stack application for managing college complaints with role-based access control for students, staff, and administrators.

## Features

### For Students:
- User registration and login
- Submit new complaints with file attachments
- View complaint status and history
- Submit feedback on resolved complaints
- Profile management

### For Staff:
- View assigned complaints
- Update complaint status
- Add notes and comments
- Track complaint progress

### For Administrators:
- **Complete complaint management dashboard**
- View all complaints across the system
- Assign complaints to staff members
- Update complaint status and priority
- Add admin notes and comments
- View comprehensive statistics
- **Staff management** - Add, edit, and manage staff members
- Filter and search complaints
- Export complaint data

## Technology Stack

- **Frontend**: Angular 20, TypeScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Styling**: Custom CSS with responsive design

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)
- Angular CLI

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

4. Start MongoDB service

5. Create admin user:
```bash
node create-admin.js
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The frontend will run on `http://localhost:4200`

## Default Admin Credentials

- **Email**: admin@college.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Complaints
- `GET /api/complaints` - Get complaints (role-based filtering)
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint
- `POST /api/complaints/:id/feedback` - Submit feedback

### Admin Routes
- `GET /api/admin/stats` - Get complaint statistics
- `GET /api/admin/complaints` - Get all complaints (admin only)
- `GET /api/admin/complaints/:id` - Get complaint details
- `PUT /api/admin/complaints/:id/status` - Update complaint status
- `PUT /api/admin/complaints/:id/assign` - Assign complaint to staff
- `GET /api/admin/staff` - Get all staff members
- `POST /api/admin/staff` - Create new staff member

## User Roles

### Student
- Can create complaints
- Can view their own complaints
- Can submit feedback
- Can update profile

### Staff
- Can view assigned complaints
- Can update complaint status
- Can add notes
- Can update profile

### Admin
- Can view all complaints
- Can assign complaints to staff
- Can update any complaint status
- Can manage staff members
- Can view system statistics
- Can add admin notes

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['student', 'staff', 'admin']),
  department: String (required for staff),
  createdAt: Date
}
```

### Complaint Model
```javascript
{
  title: String,
  description: String,
  category: String (enum: ['hostel', 'mess', 'college', 'academic', 'administrative', 'other']),
  status: String (enum: ['pending', 'in-progress', 'resolved', 'rejected']),
  priority: String (enum: ['low', 'medium', 'high']),
  createdBy: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User),
  proofImage: String,
  feedback: {
    rating: Number,
    comment: String,
    submittedAt: Date
  },
  adminNotes: String,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Implemented

### Admin Dashboard
- **Statistics Overview**: Total, pending, in-progress, and resolved complaints
- **Complaint Management**: View, filter, and search all complaints
- **Staff Assignment**: Assign complaints to specific staff members
- **Status Management**: Update complaint status and priority
- **Admin Notes**: Add internal notes and comments
- **Responsive Design**: Works on desktop, tablet, and mobile

### Staff Management
- **Add Staff Members**: Create new staff accounts with department assignment
- **Edit Staff Information**: Update staff details
- **Department Management**: Organize staff by departments
- **Role-based Access**: Ensure only admins can manage staff

### Enhanced Security
- **JWT Authentication**: Secure token-based authentication
- **Role-based Authorization**: Different access levels for different user types
- **Password Hashing**: Secure password storage using bcrypt
- **CORS Configuration**: Proper cross-origin resource sharing setup

## File Structure

```
college-complaint-system/
├── backend/
│   ├── config/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── complaints.js
│   │   ├── admin.js
│   │   └── users.js
│   ├── uploads/
│   ├── server.js
│   └── create-admin.js
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── dashboard/
    │   │   │   │   ├── admin-dashboard/
    │   │   │   │   ├── staff-dashboard/
    │   │   │   │   └── student-dashboard/
    │   │   │   ├── admin/
    │   │   │   │   └── staff-management/
    │   │   │   ├── login/
    │   │   │   ├── register/
    │   │   │   ├── new-complaint/
    │   │   │   └── profile/
    │   │   ├── services/
    │   │   │   ├── auth.service.ts
    │   │   │   ├── complaint.service.ts
    │   │   │   └── admin.service.ts
    │   │   ├── guards/
    │   │   └── interceptors/
    │   └── environments/
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact archana9014060147@gmail.com or create an issue in the repository.


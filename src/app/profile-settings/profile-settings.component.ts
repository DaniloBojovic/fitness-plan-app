import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent {
  profileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.authService.getProfile(userId).subscribe(
      (profile) => {
        this.profileForm.patchValue(profile);
      },
      (error) => {
        console.error('Failed to fetch profile:', error);
      }
    );
  }

  onSubmit() {
    const { password, ...profile } = this.profileForm.value;
    this.authService
      .updateProfile(this.authService.getUserId(), password, profile)
      .subscribe({
        next: () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert('Failed to update profile.');
          console.error(error);
        },
      });
  }
}
